import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { AssessmentService } from '../../services/AssessmentService';

const formValues = {
  value0: 0,
  value1: 1,
};

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
    data.contactWithJudicialSystem = parseInt(data.contactWithJudicialSystem);
    data.altercationsWithCats = parseInt(data.altercationsWithCats);
    data.altercationsWithOwner = parseInt(data.altercationsWithOwner);
    data.playsWellWithDogs = parseInt(data.playsWellWithDogs);
    data.hissesAtStrangers = parseInt(data.hissesAtStrangers);
    data.score = -1;
    data.riskLevel = -1;
    data.instrumentType = -1;
    // Submit data
    await AssessmentService.submit(data);
  };

  return <Form onSubmit={handleSubmit(onSubmit)}>

    <h1>Cat Behavioral Instrument</h1>

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
      <option value={formValues.value0}>No</option>
      <option value={formValues.value1}>Yes</option>
    </Form.Select>

    <Form.Label htmlFor="hissesAtStrangers">Does this cat hiss at strangers?*</Form.Label>
    <Form.Select id="hissesAtStrangers" name="hissesAtStrangers" required="required"
      {...register(`hissesAtStrangers`, { required: true })}>
      <option value="">...</option>
      <option value={formValues.value0}>No</option>
      <option value={formValues.value1}>Yes</option>
    </Form.Select>
    <Button variant="primary" type="submit">Submit</Button>
    <p>* Required</p>
  </Form>;
};
