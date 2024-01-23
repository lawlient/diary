package util

import (
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v4"
)

const (
	Issuer       = "yraid"
	AudienceName = "access-token"
)

type ClaimsMessage struct {
	Name string `json:"name"`
	jwt.RegisteredClaims
}

func GenerateAccessToken(username string, uid int32, exp time.Time, secret []byte) (string, error) {
	claims := jwt.RegisteredClaims{
		Issuer:   Issuer,
		Audience: jwt.ClaimStrings{AudienceName},
		IssuedAt: jwt.NewNumericDate(time.Now()),
		Subject:  fmt.Sprint(uid),
	}

	if !exp.IsZero() {
		claims.ExpiresAt = jwt.NewNumericDate(exp)
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, &ClaimsMessage{
		Name:             username,
		RegisteredClaims: claims,
	})

	tokenstr, err := token.SignedString(secret)
	if err != nil {
		return "", err
	}

	return tokenstr, nil
}
