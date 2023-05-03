import Axios from '../utils/http.config';

export class AssessmentService {
  static submit(assessment) {
    try {
      // Choose the correct method, url, and data to send
      // in a request to the express packages/api/src/routes/assessment.js
      // NOTE: the http.config file automatically adds /api to the front of your url
      console.log(`AssessmentService:`); // eslint-disable-line no-console
      console.log(assessment); // eslint-disable-line no-console
      return Axios.post(`/assessment/submit`, { assessment })
        .then(response => response.data);
    }
    catch (err) {
      throw new Error(`${err.response.statusText} - ${err.response.data.message}`);
    }
  }

  static getList() {
    try {
      // Choose the correct method, url, and data to send
      // in a request to the express packages/api/src/routes/assessment.js
      // NOTE: the http.config file automatically adds /api to the front of your url
      const assessments = Axios.get(`/assessment/list`, {
        params: {
        },
      })
        .then(response => response.data.data);
      console.log(assessments); // eslint-disable-line no-console
      return assessments;
    }
    catch (err) {
      throw new Error(`${err.response.statusText} - ${err.response.data.message}`);
    }
  }

  static delete(id) {
    console.log(`AssessmentService: Deleting row `, id); // eslint-disable-line no-console
    try {
      Axios.post(`/assessment/delete`, { id });
    }
    catch (err) {
      throw new Error(`${err.response.statusText} - ${err.response.data.message}`);
    }
  }
}
