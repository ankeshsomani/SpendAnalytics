package com.mastek.designschool.common.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
@JsonIgnoreProperties(ignoreUnknown = true)
public class BankStatement {


	@JsonProperty("customerId")
	private String customerId;
	
	@JsonProperty("accountId")
	private String accountId;
	
	
	
	@JsonProperty("transactions")
	private List<AccountTransaction> transactions;
	public String getCustomerId() {
		return customerId;
	}
	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}
	public String getAccountId() {
		return accountId;
	}
	public void setAccountId(String accountId) {
		this.accountId = accountId;
	}
	public List<AccountTransaction> getTransactions() {
		return transactions;
	}
	public void setTransactions(List<AccountTransaction> transactions) {
		this.transactions = transactions;
	}
	
	@Override
	public String toString() {
		StringBuffer str=new StringBuffer("customerId:-"+customerId+"\n");
		int x=1;
		for(AccountTransaction transaction:transactions){
			str.append("transaction id:-"+x);
			str.append("\n");
			str.append("date:-"+transaction.getTransactionDate());
			str.append("\n");
			str.append("description:-"+transaction.getDescription());
			str.append("\n");
			str.append("paidin:-"+transaction.getPaidIn());
			str.append("\n");
			str.append("paidout:-"+transaction.getPaidOut());
			str.append("\n");
			str.append("balance:-"+transaction.getBalance());
			str.append("\n");
			x++;
		}
		
		return str.toString();
	}
	
	
}
