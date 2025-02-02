import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useFormik } from "formik"
import * as yup from "yup"

function SongForm({ addSong }) {
  const history = useHistory()
  const formSchema = yup.object().shape({
    title: yup.string().required("Must enter a title"),
    artist: yup.string().required("Must enter an artist"),
    genre: yup.string(),
    url: yup.string()
  })

  const formik = useFormik({
    initialValues: {
      title: '',
      artist: '',
      genre: '',
      url: '',
    },

    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("/songs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      }).then((res) => {
        if (res.ok) {
          res.json().then(song => {
            addSong(song)
            history.push(`/songs/${song.id}`)
          })
        }
      })
    },
  })

  return (
    <div className='App'>

      <Form onSubmit={formik.handleSubmit}>
        <label>Title </label>
        <br />
        <input type='text' name='title' value={formik.values.title} onChange={formik.handleChange} />
        <br />
        <label> Artist </label>
        <br />
        <input type='text' name='artist' value={formik.values.artist} onChange={formik.handleChange} />
        <br />
        <label> Genre </label>
        <br />
        <input type='text' name='genre' value={formik.values.genre} onChange={formik.handleChange} />
        <br />
        <label> URL </label>
        <br />
        <input type='text' name='url' value={formik.values.url} onChange={formik.handleChange} />

        <input type='submit' />
      </Form>
    </div>
  )
}

export default SongForm

const Form = styled.form`
    display:flex;
    flex-direction:column;
    width: 400px;
    margin:auto;
    font-family:'Permanent marker';
    font-size:30px;
    color: black;
    input[type=submit]{
      background-color:black;
      color: white;
      height:40px;
      font-family: 'Permanent marker';
      font-size:30px;
      margin-top:10px;
      margin-bottom:10px;
    }
  `
