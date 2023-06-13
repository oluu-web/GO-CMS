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

func (app *application) createArticle(w http.ResponseWriter, r *http.Request) {
	var payload models.Article

	type jsonResp struct {
		OK             bool   `json:"ok"`
		Message        string `json:"message"`
		UserID         string `json:"user_id,omitempty"`
		ArticleID      int    `json:"article_id,omitempty"`
		ArticleContent string `json:"article_content,omitempty"`
	}

	err := json.NewDecoder(r.Body).Decode(&payload)
	// payload.ID = rand.Intn(10000000000)

	if err != nil {
		app.errorJSON(w, err)
		return
	}

	ok := jsonResp{
		OK:             true,
		Message:        "Article successfully created",
		ArticleContent: payload.Content,
	}

	// bad := jsonResp{
	// 	OK:      false,
	// 	Message: "Error",
	// }
	err = app.models.DB.CreateArticle(payload.Title, payload.Content)
	if err != nil {
		app.errorJSON(w, err)
	}

	app.logger.Println(payload.Content)

	err = app.writeJSON(w, http.StatusOK, ok, "response")
	if err != nil {
		app.errorJSON(w, err)
		return
	}
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

func (app *application) editArticle(w http.ResponseWriter, r *http.Request) {
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
		app.writeJSON(w, http.StatusInternalServerError, bad, "response")
		return
	}
	// Check if the provided password matches the stored password
	if credentials.Password != user.Password {
		app.writeJSON(w, http.StatusInternalServerError, bad, "response")
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
func (app *application) getCouncil(w http.ResponseWriter, r *http.Request) {
	council, err := app.models.DB.Council()
	if err != nil {
		app.errorJSON(w, err)
		return
	}

	err = app.writeJSON(w, http.StatusOK, council, "council")
	if err != nil {
		app.errorJSON(w, err)
		return
	}
}
