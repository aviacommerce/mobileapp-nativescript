import { Injectable } from "@angular/core";
import { Feedback, FeedbackPosition, FeedbackType } from "nativescript-feedback";
import { Color } from "tns-core-modules/color";

@Injectable()
export class SharedService {

  feedback: Feedback;

  constructor() {
    this.feedback = new Feedback();
  }

  alert(msg: string) {
    return alert({
      okButtonText: "Ok",
      message: msg
    });
  }

  successMessage(messageText: string) {
    this.feedback.show({
      message: messageText,
      type: FeedbackType.Success,
      duration: 2000,
      // backgroundColor: new Color("yellowGreen"),
      messageSize:	15
    });
  }

  infoMessage(messageText: string) {
    this.feedback.show({
      message: messageText,
      type: FeedbackType.Info,
      duration: 2000,
      // backgroundColor: new Color("orange"),
      messageSize:	15
    });
  }

  errorMessage(messageText: string) {
    this.feedback.show({
      message: messageText,
      type: FeedbackType.Error,
      duration: 2000,
      // backgroundColor: new Color("red"),
      messageSize:	15
    });
  }
}
