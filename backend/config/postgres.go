package config

import (
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
)

var DB *sql.DB

func InitPostgres() error {
	connStr := "host=localhost port=5432 user=postgres password=postgres dbname=ampcloudranger sslmode=disable"
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		return fmt.Errorf("failed to open postgres: %w", err)
	}
	if err := db.Ping(); err != nil {
		return fmt.Errorf("failed to ping postgres: %w", err)
	}
	DB = db
	return nil
}

// Initial queries for the project
func CreateTables() error {
	queries := []string{
		`CREATE TABLE IF NOT EXISTS metrics (
			id SERIAL PRIMARY KEY,
			service VARCHAR(50),
			metric VARCHAR(50),
			value FLOAT,
			timestamp TIMESTAMP
		);`,
		`CREATE TABLE IF NOT EXISTS billing (
			id SERIAL PRIMARY KEY,
			group_name VARCHAR(50),
			amount FLOAT,
			currency VARCHAR(10),
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		);`,
		`CREATE TABLE IF NOT EXISTS alerts (
			id SERIAL PRIMARY KEY,
			name VARCHAR(100),
			metric VARCHAR(50),
			threshold FLOAT,
			comparison VARCHAR(5),
			duration VARCHAR(10),
			channel VARCHAR(20),
			target VARCHAR(100),
			active BOOLEAN DEFAULT TRUE,
			last_triggered TIMESTAMP
		);`,
		`CREATE TABLE IF NOT EXISTS exports (
			id SERIAL PRIMARY KEY,
			format VARCHAR(10),
			type VARCHAR(20),
			template_id VARCHAR(50),
			from_date DATE,
			to_date DATE,
			email VARCHAR(100),
			status VARCHAR(20),
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		);`,
	}
	for _, q := range queries {
		if _, err := DB.Exec(q); err != nil {
			return fmt.Errorf("failed to execute query: %w", err)
		}
	}
	return nil
}
