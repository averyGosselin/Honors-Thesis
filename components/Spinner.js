import * as React from 'react';
import { ActivityIndicator, Text } from 'react-native';
import { useState } from 'react'

export default function Spinner(props) {
    const [isLoading, setIsLoading] = useState(props.animating)

    return (
        <ActivityIndicator
            size = {props.size}
            color = {props.color}
            animating = {props.animating}
        />
    )
}