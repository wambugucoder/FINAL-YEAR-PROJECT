package com.server.pollingapp.request;

import java.io.Serializable;
import javax.validation.constraints.NotNull;

public class ChoiceRequest implements Serializable {
  public ChoiceRequest(String option) { this.option = option; }

  public ChoiceRequest() {}

  @NotNull(message = "Choice cannot be Null") private String option;

  public String getOption() { return option; }

  public void setOption(String option) { this.option = option; }
}
