package com.shorthis.service.exception.handler;

import com.shorthis.service.exception.ShortedUrlNotFoundException;
import com.shorthis.service.exception.UrlException;
import com.shorthis.service.exception.UserException;
import com.shorthis.service.exception.UserNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@ControllerAdvice
public class EntitiesExceptionHandler extends ResponseEntityExceptionHandler {

    private MessageSource messageSource;

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex,
            HttpHeaders headers, HttpStatus status, WebRequest request) {

        List<Problem.Field> fields = new ArrayList<>();

        ex.getBindingResult().getAllErrors().forEach( (objectError) -> {

            fields.add(new Problem.Field(
                    ((FieldError) objectError).getField() ,
                    messageSource.getMessage(objectError, LocaleContextHolder.getLocale())));
        } );

        Problem problem = new Problem(status.value(), OffsetDateTime.now(),
                "Um ou mais campos invalídos , preencha corretamento e tente novamente",fields);

        return handleExceptionInternal(ex,problem,headers,status,request);
    }

    @ExceptionHandler(UrlException.class)
    public ResponseEntity<Object> handleURLException(UrlException ex, WebRequest request) {

        Problem problem = new Problem(HttpStatus.BAD_REQUEST.value(), OffsetDateTime.now(),ex.getMessage(),null);

        return  handleExceptionInternal(ex,problem,new HttpHeaders(),HttpStatus.BAD_REQUEST,request);
    }

    @ExceptionHandler(UserException.class)
    public ResponseEntity<Object> handleUserException(UserException ex, WebRequest request) {

        Problem problem = new Problem(HttpStatus.BAD_REQUEST.value(), OffsetDateTime.now(),ex.getMessage(),null);

        return  handleExceptionInternal(ex,problem,new HttpHeaders(),HttpStatus.BAD_REQUEST,request);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<Object> handleUserNotFoundException(UserNotFoundException ex, WebRequest request) {

        Problem problem = new Problem(HttpStatus.NOT_FOUND.value(), OffsetDateTime.now(),ex.getMessage(),null);

        return  handleExceptionInternal(ex,problem,new HttpHeaders(),HttpStatus.NOT_FOUND,request);
    }

    @ExceptionHandler(ShortedUrlNotFoundException.class)
    public ResponseEntity<Object> handleShortedUrlNotFoundException(ShortedUrlNotFoundException ex, WebRequest request) {

        Problem problem = new Problem(HttpStatus.NOT_FOUND.value(), OffsetDateTime.now(),ex.getMessage(),null);

        return  handleExceptionInternal(ex,problem,new HttpHeaders(),HttpStatus.NOT_FOUND,request);
    }

}
