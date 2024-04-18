import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import Card from '../../shared/components/UIElements/Card'
import { useForm } from '../../shared/hooks/form-hook'
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validator'
import './PlaceForm.css'
import { useHttpClient } from '../../shared/hooks/http-hook'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import { AuthContext } from '../../shared/context/auth-context'

const UpdatePlace = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlace, setLoadedPlace] = useState();
  const placeId = useParams().placeId;
  const navigate = useNavigate(); 
  const auth = useContext(AuthContext);
  const placeUpdateSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`, 'PATCH', JSON.stringify({
        title: formState.inputs.title.value,
        description: formState.inputs.description.value,
      }),
        { 'Content-Type': 'application/json', Authorization: 'Bearer ' + auth.token }
      );
        navigate('/' + auth.userId + '/places');
    } catch (error) { }
  }

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      }
    },
    false
  )

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`);
        setLoadedPlace(responseData.place);
        setFormData(
        {
          title: {
            value: responseData.place.title,
            isValid: true
          },
          description: {
            value: responseData.place.description,
            isValid: true
          }
        },
        true
      )
      } catch (error) { }
    }; 
    fetchPlace();
  }, [sendRequest, placeId, setFormData])

  if (isLoading) {
    return (
      <div className="center" >
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedPlace && !error && !isLoading) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find specified place.</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedPlace && <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please Enter Input"
          initialValue={loadedPlace.title}
          initialValid={true}
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please Enter a Valid Description (min 5 characters)"
          initialValue={loadedPlace.description}
          initialValid={true}
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Update Place
        </Button>
      </form>}
      </React.Fragment>
    )
}

export default UpdatePlace
