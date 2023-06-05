package main

import (
	"backend/cmd/api/models"
	"encoding/json"
	"errors"
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
	if err != nil {
		return
	}
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
	ID      int    `json:"id"`
	Title   string `json:"title"`
	Content string `json:"content"`
}

func (app *application) editArticle(w http.ResponseWriter, r *http.Request) {
	err := json.NewDecoder(r.Body).Decode(&payload)
	params := httprouter.ParamsFromContext(r.Context())
	app.logger.Println(params.ByName("id"))
	id, err := strconv.Atoi(params.ByName("id"))
	if err != nil {
		app.logger.Println(errors.New("invalid id parameter"))
		app.errorJSON(w, err)
		return
	}

	var updatedArticle models.Article
	err = json.NewDecoder(r.Body).Decode(&updatedArticle)
	if err != nil {
		app.errorJSON(w, err)
		return
	}

	article, err := app.models.DB.EditArticle(&updatedArticle, id)
	// Pass updatedArticle and id as arguments to EditArticle

	if err != nil {
		app.errorJSON(w, err)
		return
	}
	app.logger.Println(article.Title + "\n" + article.Content)

	type jsonResp struct {
		OK      bool   `json:"ok"`
		Message string `json:"message"`
	}

	ok := jsonResp{
		OK:      true,
		Message: article.Content,
	}

	err = app.writeJSON(w, http.StatusOK, ok, "response")
	if err != nil {
		app.errorJSON(w, err)
		return
	}
}

// func (app *application) editArticle(w http.ResponseWriter, r *http.Request) {

// 	params := httprouter.ParamsFromContext(r.Context())
// 	app.logger.Println(params.ByName("id"))
// 	id, err := strconv.Atoi(params.ByName("id"))
// 	if err != nil {
// 		app.logger.Println(errors.New("invalid id parameter"))
// 		app.errorJSON(w, err)
// 		return
// 	}

// 	// var payload ArticlePayload

// 	var updatedArticle models.Article

// 	err = json.NewDecoder(r.Body).Decode(&updatedArticle)
// 	if err != nil {
// 		app.errorJSON(w, err)
// 		return
// 	}

// 	// err := json.NewDecoder(r.Body).Decode(&payload)
// 	// if err != nil {
// 	// 	app.errorJSON(w, err)
// 	// 	return
// 	// }

// 	// var article models.Article

// 	// article.ID = payload.ID
// 	// article.Title = payload.Title
// 	// article.Content = payload.Content

// 	// Pass updatedArticle and id as arguments to EditArticle

// 	article, err := app.models.DB.EditArticle(&updatedArticle, id)
// 	if err != nil {
// 		app.errorJSON(w, err)
// 		return
// 	}

// 	// article, err := app.models.DB.EditArticle(&payload, payload.ID)

// 	// if err != nil {
// 	// 	app.errorJSON(w, err)
// 	// 	return
// 	// }

// 	app.logger.Panicln(article.Content)

// 	type jsonResp struct {
// 		OK bool `json:"ok"`
// 	}

// 	ok := jsonResp{
// 		OK: true,
// 	}

// 	err = app.writeJSON(w, http.StatusOK, ok, "response")
// 	if err != nil {
// 		app.errorJSON(w, err)
// 		return
// 	}
// }

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
