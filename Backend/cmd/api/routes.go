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

	router.HandlerFunc(http.MethodPut, "/v1/admin/editarticle/:id", app.editArticle)

	router.HandlerFunc(http.MethodPost, "/v1/login", app.login)

	return app.enableCORS(router)
}
