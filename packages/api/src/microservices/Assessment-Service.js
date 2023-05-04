const { Assessment } = require(`../database/models`);

exports.submit = async (assessment) => {
  // use the sequelize model Assessments from packages/api/src/database/models to save
  // the assessment data in the PostgreSQL database
  await Assessment.create(assessment);
};

exports.getList = () => {
  // use the sequelize model Assessments from packages/api/src/database/models to fetch
  // the assessment data from the PostgreSQL database
  const assessments = Assessment.findAll();
  // console.log(`Assessment-Service:`, assessments); // eslint-disable-line no-console

  return assessments;
};

exports.delete = async (id) => {
  const rId = parseInt(id);
  await Assessment.destroy({
    where: {
      id: rId,
    },
  });
};
