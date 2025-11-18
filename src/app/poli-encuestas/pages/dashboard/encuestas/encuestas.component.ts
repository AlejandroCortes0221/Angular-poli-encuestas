import { Component } from '@angular/core';
import { SurveyModule } from "survey-angular-ui";
import { Model } from 'survey-core';
// survey.component.ts
import "survey-core/survey-core.min.css";


const surveyJson = {
  pages: [{
    name: "PersonalDetails",
    elements: [{
      type: "text",
      name: "FirstName",
      title: "Enter your first name:"
    }, {
      type: "text",
      name: "LastName",
      title: "Enter your last name:"
    }, {
      type: "panel",
      name: "Contacts",
      state: "collapsed",
      title: "Contacts (optional)",
      elements: [{
        type: "text",
        name: "Telegram",
        title: "Telegram:"
      }, {
        type: "text",
        name: "GitHub",
        title: "GitHub username:"
      }]
    }]
  }]
};

@Component({
  selector: 'app-encuestas',
  imports: [SurveyModule],
  templateUrl: './encuestas.component.html',
  styleUrl: './encuestas.component.css'
})
export class EncuestasComponent {

  surveyModel: Model = new Model(surveyJson);

  constructor() { }
}
