package com.mastek.designschool.common.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class AccountTransaction {

	@JsonProperty("transactionDate")
	private String transactionDate;
	@JsonProperty("description")
	private String description;
	@JsonProperty("paidIn")
	private String paidIn;
	@JsonProperty("paidOut")
	private String paidOut;
	@JsonProperty("transactionType")
	private String transactionType;
	@JsonProperty("balance")
	private String balance;

	public String getTransactionDate() {
		return transactionDate;
	}

	public void setTransactionDate(String transactionDate) {
		this.transactionDate = transactionDate;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getPaidIn() {
		return paidIn;
	}

	public void setPaidIn(String paidIn) {
		this.paidIn = paidIn;
	}

	public String getPaidOut() {
		return paidOut;
	}

	public void setPaidOut(String paidOut) {
		this.paidOut = paidOut;
	}

	public String getTransactionType() {
		return transactionType;
	}

	public void setTransactionType(String transactionType) {
		this.transactionType = transactionType;
	}

	public String getBalance() {
		return balance;
	}

	public void setBalance(String balance) {
		this.balance = balance;
	}

}
