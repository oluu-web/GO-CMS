package models

import (
	"context"
	"database/sql"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

type DBModel struct {
	DB *sql.DB
}

func (a *DBModel) GetArticleById(id int) (*Article, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	const query = "SELECT * FROM GO_CMS WHERE id = ?"
	row := a.DB.QueryRowContext(ctx, query, id)

	var article Article

	err := row.Scan(
		&article.ID,
		&article.Title,
		&article.Content,
		&article.CreatedAt,
		&article.UpdatedAt,
	)
	if err != nil {
		return nil, err
	}
	return &article, nil
}

func (a *DBModel) All() ([]*Article, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := "SELECT * FROM GO_CMS ORDER BY title"

	rows, err := a.DB.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var articles []*Article

	for rows.Next() {
		var article Article
		err := rows.Scan(
			&article.ID,
			&article.Title,
			&article.Content,
			&article.CreatedAt,
			&article.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}
		articles = append(articles, &article)
	}
	return articles, nil
}

func (a *DBModel) GetUserByEmail(email string) (*User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	const query = "SELECT * FROM users WHERE email = ?"
	row := a.DB.QueryRowContext(ctx, query, email)

	var user User

	err := row.Scan(
		&user.ID,
		&user.Email,
		&user.Password,
	)
	if err != nil {
		return nil, err
	}
	return &user, nil
}
