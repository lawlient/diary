package util

import (
	"fmt"
	"strconv"
	"time"

	"github.com/golang-jwt/jwt/v4"
	"github.com/pkg/errors"
)

const (
	Issuer       = "yraid"
	AudienceName = "access-token"
	TokenExpire  = 30 * time.Minute
	Secret       = "yraid is good"
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

func GetUidFromAccessToken(accessToken, secret string) (int, error) {
	claims := &ClaimsMessage{}
	_, err := jwt.ParseWithClaims(accessToken, claims, func(t *jwt.Token) (any, error) {
		if t.Method.Alg() != jwt.SigningMethodHS256.Name {
			return nil, errors.Errorf("unexpected access token signing method=%v, expect %v", t.Header["alg"], jwt.SigningMethodHS256)
		}
		return []byte(secret), nil
	})
	if err != nil {
		return 0, errors.Wrap(err, "Invalid or expired access token")
	}
	uid, err := strconv.Atoi(claims.Subject)
	if err != nil {
		return 0, errors.Wrap(err, "Malformed ID in the token")
	}
	return uid, nil
}
