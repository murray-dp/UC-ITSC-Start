import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { AssessmentService } from '../../services/AssessmentService';
import '../../scss/form.scss';

const formValues = {
  value0: 0,
  value1: 1,
};

function getRiskLevel(score) {
  switch (true) {
    case score >= 4:
      return `high`;
    case score < 4 && score >= 2:
      return `medium`;
    default:
      return `low`;
  }
}

export const NewAssessment = () => {
  // console.log(`Loading useForm...`); // eslint-disable-line no-console
  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm();
  // console.log(`useForm loaded!`); // eslint-disable-line no-console

  // create a form that utilizes the "onSubmit" function to send data to
  // packages/client/src/services/AssessmentService.js and then onto the packages/api/src/routes/assessment express API
  const onSubmit = async (data) => {
    // Temporary values
    let sum = 0;
    sum += data.contactWithJudicialSystem = parseInt(data.contactWithJudicialSystem);
    sum += data.altercationsWithCats = parseInt(data.altercationsWithCats);
    sum += data.altercationsWithOwner = parseInt(data.altercationsWithOwner);
    sum += data.playsWellWithDogs = parseInt(data.playsWellWithDogs);
    sum += data.hissesAtStrangers = parseInt(data.hissesAtStrangers);
    data.score = sum;
    data.riskLevel = getRiskLevel(sum);
    data.instrumentType = -1;
    // Submit data
    await AssessmentService.submit(data);

    document.getElementById(`assessmentForm`).reset();
    document.getElementById(`submitMessage`).innerText = `The form has been submitted!`;
  };

  return <Form id="assessmentForm" onSubmit={handleSubmit(onSubmit)}>

    <h1>Cat Behavioral Assessment</h1>

    <Form.Label htmlFor="catName">Cat's Name:*</Form.Label>
    <Form.Control type="text" id="catName" name="catName" placeholder="Fluffy" required="required"
      {...register(`catName`, { required: true })} />

    <Form.Label htmlFor="dateOfBirth">Cat's Date of Birth:*</Form.Label>
    <Form.Control type="date" id="catDateOfBirth" name="catDateOfBirth" placeholder="01/01/2010" required="required"
      {...register(`catDateOfBirth`, { required: true })} />

    <Form.Label htmlFor="contactWithJudicialSystem">Has this cat previously been in contact with the
      Cat Judicial System?*</Form.Label>
    <Form.Select id="contactWithJudicialSystem" name="ContactWithJudicialSystem" required="required"
      {...register(`contactWithJudicialSystem`, { required: true })}>
      <option value="">...</option>
      <option value={formValues.value0}>No</option>
      <option value={formValues.value1}>Yes</option>
    </Form.Select>

    <Form.Label htmlFor="altercationsWithCats">How many physical altercations has this cat been
      in with other cats?*</Form.Label>
    <Form.Select id="altercationsWithCats" name="altercationsWithCats" required="required"
      {...register(`altercationsWithCats`, { required: true })}>
      <option value="">...</option>
      <option value={formValues.value0}>0-3 Altercations</option>
      <option value={formValues.value1}>3+ Altercations</option>
    </Form.Select>

    <Form.Label htmlFor="altercationsWithCats">How many physical altercations has this cat been
      in with their owner?*</Form.Label>
    <Form.Select id="altercationsWithOwner" name="altercationsWithOwner" required="required"
      {...register(`altercationsWithOwner`, { required: true })}>
      <option value="">...</option>
      <option value={formValues.value0}>0-10 Altercations</option>
      <option value={formValues.value1}>10+ Altercations</option>
    </Form.Select>

    <Form.Label htmlFor="playsWellWithDos">Does this cat play well with dogs?*</Form.Label>
    <Form.Select id="playsWellWithDogs" name="playsWellWithDogs" required="required"
      {...register(`playsWellWithDogs`, { required: true })}>
      <option value="">...</option>
      <option value={formValues.value1}>No</option>
      <option value={formValues.value0}>Yes</option>
    </Form.Select>

    <Form.Label htmlFor="hissesAtStrangers">Does this cat hiss at strangers?*</Form.Label>
    <Form.Select id="hissesAtStrangers" name="hissesAtStrangers" required="required"
      {...register(`hissesAtStrangers`, { required: true })}>
      <option value="">...</option>
      <option value={formValues.value0}>No</option>
      <option value={formValues.value1}>Yes</option>
    </Form.Select>
    <Button id="submit" variant="primary" type="submit">Submit</Button>
    <p className="required">* Required</p>
    <div id="submitMessage" />
  </Form>;
};
