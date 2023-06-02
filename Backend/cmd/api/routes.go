package main

import (
	"net/http"

	"github.com/julienschmidt/httprouter"
)

func (app *application) routes() http.Handler {
	router := httprouter.New()

	router.HandlerFunc(http.MethodGet, "/status", app.statusHandler)

	router.HandlerFunc(http.MethodGet, "/v1/article/:id", app.getArticlebyId)
	router.HandlerFunc(http.MethodGet, "/v1/articles", app.getAllArticles)

	router.HandlerFunc(http.MethodPost, "/v1/admin/editarticle", app.editArticle)

	return app.enableCORS(router)
}
