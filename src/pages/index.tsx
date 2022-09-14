import type { NextPage } from 'next'
import Head from 'next/head';
import _BaseGuestLayout from '../layouts/_baseGuestLayout'
import ViewMap from './View/ViewMap'

const Home: NextPage = () => {
  return (
    <ViewMap />
  )
}

export default Home

