const { AssessmentService } = require(`../microservices`);
const { ResponseHandler } = require(`../utils`);

const { Router } = require(`express`);

const assessmentRouter = Router();

assessmentRouter.post(
  `/submit`,
  async (req, res, next) => {
    console.log(`test`); // eslint-disable-line no-console
    try {
      const { assessment } = req.body;

      // verify that your data is making it here to the API by using console.log(assessment);
      // call the AssessmentService.submit function from packages/api/src/microservices/Assessment-Service.js and
      // supply the correct parameters
      // console.log(`assessment.js:`); // eslint-disable-line no-console
      // console.log(assessment); // eslint-disable-line no-console
      await AssessmentService.submit(assessment);
      // console.log(success); // eslint-disable-line no-console

      ResponseHandler(
        res,
        `Submitted assessment`,
        { assessment },
      );
    } catch (err) {
      next(err);
    }
  },
);

assessmentRouter.get(
  `/list`,
  async (req, res, next) => {
    try {
      // verify that your data is making it here to the API by using console.log();
      // call the AssessmentService.getList function from packages/api/src/microservices/Assessment-Service.js
      const assessments = await AssessmentService.getList();
      console.log(`assessment.js`); // eslint-disable-line

      ResponseHandler(
        res,
        `Fetched assessments`,
        assessments,
      );
    } catch (err) {
      next(err);
    }
  },
);

assessmentRouter.post(
  `/delete`,
  async (req, res, next) => {
    try {
      const { id } = req.body;
      await AssessmentService.delete(id);
      console.log(`assessment.js: Deleting row `, id); // eslint-disable-line no-console

      ResponseHandler(
        res,
        `Deleted assessment`,
        { id },
      );
    } catch (err) {
      next(err);
    }
  },
);

module.exports = { assessmentRouter };
