package com.shorthis.service.exception.handler;

import lombok.AllArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.sql.SQLIntegrityConstraintViolationException;
import java.time.OffsetDateTime;
;

@AllArgsConstructor
@ControllerAdvice
public class SQLExceptionHandler extends ResponseEntityExceptionHandler {

    private MessageSource messageSource;


    @ExceptionHandler(SQLIntegrityConstraintViolationException.class)
    public ResponseEntity<Object> handleUserException(SQLIntegrityConstraintViolationException ex, WebRequest request) {

        Problem problem = new Problem(HttpStatus.BAD_REQUEST.value(), OffsetDateTime.now(),ex.getMessage(),null);

        return  handleExceptionInternal(ex,problem,new HttpHeaders(),HttpStatus.BAD_REQUEST,request);
    }

}
