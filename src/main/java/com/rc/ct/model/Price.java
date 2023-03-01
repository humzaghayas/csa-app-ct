package com.rc.ct.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;

public class Price {
    public Price value(BigDecimal value) {
        this.value = value;
        return this;
    }
    public Price currency(String currency) {
        this.currency = currency;
        return this;
    }

    @Override
    public String toString() {
        return "Price{" +
                "currency='" + currency + '\'' +
                ", value=" + value +
                '}';
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public BigDecimal getValue() {
        return value;
    }

    public void setValue(BigDecimal value) {
        this.value = value;
    }

    public Price(String currency, BigDecimal value) {
        this.currency = currency;
        this.value = value;
    }

    public Price() {
    }

    @JsonProperty("currency")
    private String currency;

    @JsonProperty("value")
    private BigDecimal value;

}
