package main

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

var DB_NAME = "GO_CMS" //This was created so that you won't need to manually change the database name in your SQL queries

func (app *application) Connect(url string) (*sql.DB, error) {

	db, err := sql.Open("mysql", url)
	if err != nil {
		return nil, err
	}

	err = db.Ping()
	if err != nil {
		return nil, err
	}

	fmt.Println("Connected to the database!")
	return db, nil

}
