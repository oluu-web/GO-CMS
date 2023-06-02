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

func (app *application) editArticle(w http.ResponseWriter, r *http.Request) {

	var article models.Article
	err := json.NewDecoder(r.Body).Decode(&article)
	if err != nil {
		app.errorJSON(w, err)
		return
	}

	log.Println(article.Title)

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
