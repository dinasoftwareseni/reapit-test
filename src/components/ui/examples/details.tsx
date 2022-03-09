import React,{FC, useState} from 'react';
import { withRouter, RouteComponentProps } from 'react-router'
import {
    Card,
    Title
  } from '@reapit/elements'
  
export type ResultProps = RouteComponentProps

export const DetailsPage: FC<ResultProps> = ({ history }) => {
    const id = history.location.state.id
    const description = history.location.state.description
    const line1 = history.location.state.line1
    const marketingMode = history.location.state.marketingMode
   
       
    console.log(history)

    return (
        <>
            <Title>Details of Table</Title>
            <Card
                hasMainCard
                mainCardHeading={id}
                mainCardSubHeading={line1}
                mainCardSubHeadingAdditional={marketingMode}
                mainCardBody={description}
                mainCardImgUrl="https://cdn.pixabay.com/photo/2016/11/18/17/46/house-1836070__340.jpg"
            />
        </>
    )
}

export default withRouter(DetailsPage)