package models

import (
	"database/sql"
)

type Models struct {
	DB DBModel
}

func NewModels(db *sql.DB) Models {
	return Models{
		DB: DBModel{DB: db},
	}
}

type Article struct {
	ID        int    `json:"id"`
	Title     string `json:"title"`
	Content   string `json:"content"`
	CreatedAt string `json:"created_at"`
	UpdatedAt string `json:"updated_at"`
}

type Council struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
	Post string `json:"post"`
	URL  string `json:"url"`
}

type User struct {
	ID       int    `json:"id"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginCredentials struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// type ArticlePayload struct {
// 	ID        int    `json:"id,omitempty"`
// 	Title     string `json:"title"`
// 	Content   string `json:"content"`
// 	CreatedAt string `json:"created_at"`
// 	UpdatedAt string `json:"updated_at"`
// }
