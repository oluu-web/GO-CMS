package main

import (
	"backend/cmd/api/models"
	"encoding/json"
	"errors"
	"log"
	"net/http"
	"strconv"

	"github.com/julienschmidt/httprouter"
)

type jsonResp struct {
	OK      bool   `json:"ok"`
	Message string `json:"message"`
	UserID  string `json:"user_id"`
}

func (app *application) getArticlebyId(w http.ResponseWriter, r *http.Request) {
	params := httprouter.ParamsFromContext(r.Context())

	id, err := strconv.Atoi(params.ByName("id"))
	if err != nil {
		app.logger.Println(errors.New("invalid id parameter"))
		app.errorJSON(w, err)
		return
	}

	article, err := app.models.DB.GetArticleById(id)

	err = app.writeJSON(w, http.StatusOK, article, "article")
	if err != nil {
		app.errorJSON(w, err)
		return
	}
}

func (app *application) getAllArticles(w http.ResponseWriter, r *http.Request) {
	articles, err := app.models.DB.All()
	if err != nil {
		app.errorJSON(w, err)
		return
	}

	err = app.writeJSON(w, http.StatusOK, articles, "articles")
	if err != nil {
		app.errorJSON(w, err)
		return
	}
}

type ArticlePayload struct {
	ID      string `json:"id"`
	Title   string `json:"title"`
	Content string `json:"content"`
}

func (app *application) editArticle(w http.ResponseWriter, r *http.Request) {
	var payload ArticlePayload

	err := json.NewDecoder(r.Body).Decode(&payload)
	if err != nil {
		app.errorJSON(w, err)
		return
	}

	var article models.Article

	article.ID, _ = strconv.Atoi(payload.ID)
	article.Title = payload.Title
	article.Content = payload.Content

	// Pass updatedArticle and id as arguments to EditArticle

	if err != nil {
		app.errorJSON(w, err)
		return
	}
	log.Println(article.Content)

	type jsonResp struct {
		OK bool `json:"ok"`
	}

	ok := jsonResp{
		OK: true,
	}

	err = app.writeJSON(w, http.StatusOK, ok, "response")
	if err != nil {
		app.errorJSON(w, err)
		return
	}
}

func (app *application) login(w http.ResponseWriter, r *http.Request) {

	var credentials models.LoginCredentials
	type jsonResp struct {
		OK      bool   `json:"ok"`
		Message string `json:"message"`
		UserID  string `json:"user_id"`
	}

	err := json.NewDecoder(r.Body).Decode(&credentials)
	if err != nil {
		app.errorJSON(w, err)
		return
	}
	ok := jsonResp{
		OK:      true,
		Message: "Login successful",
		UserID:  credentials.Email,
	}

	bad := jsonResp{
		OK:      false,
		Message: "Invalid email or password",
		UserID:  "null",
	}

	user, err := app.models.DB.GetUserByEmail(credentials.Email)
	if err != nil {
		app.writeJSON(w, http.StatusOK, bad, "response")
		return
	}
	// Check if the provided password matches the stored password
	if credentials.Password != user.Password {
		app.writeJSON(w, http.StatusOK, bad, "response")
		return
	}

	err = app.writeJSON(w, http.StatusOK, ok, "response")
	if err != nil {
		app.errorJSON(w, err)
		return
	}
}

func (app *application) deleteArticle(w http.ResponseWriter, r *http.Request) {
	params := httprouter.ParamsFromContext(r.Context())

	id, err := strconv.Atoi(params.ByName("id"))
	if err != nil {
		app.errorJSON(w, err)
		return
	}

	err = app.models.DB.DeleteArticle(id)
	if err != nil {
		app.errorJSON(w, err)
		return
	}

	ok := jsonResp{
		OK: true,
	}

	err = app.writeJSON(w, http.StatusOK, ok, "response")
	if err != nil {
		app.errorJSON(w, err)
		return
	}
}
