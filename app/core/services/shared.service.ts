import { Injectable } from "@angular/core";
import { Feedback, FeedbackPosition, FeedbackType } from "nativescript-feedback";
import * as Toast from "nativescript-toast";
import { Color } from "tns-core-modules/color";

@Injectable()
export class SharedService {

  feedback: Feedback;
  duration = 800;
  messageFontSize = 16;

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
      duration: this.duration,
      // backgroundColor: new Color("yellowGreen"),
      messageSize: this.messageFontSize
    });
  }

  infoMessage(messageText: string) {
    this.feedback.show({
      message: messageText,
      type: FeedbackType.Info,
      duration: this.duration,
      // backgroundColor: new Color("orange"),
      messageSize: this.messageFontSize
    });
  }

  errorMessage(messageText: string) {
    this.feedback.show({
      message: messageText,
      type: FeedbackType.Error,
      duration: this.duration,
      // backgroundColor: new Color("red"),
      messageSize: this.messageFontSize
    });
  }

  toastNotification(messageText: string) {
    Toast.makeText(messageText).show();
  }
}
