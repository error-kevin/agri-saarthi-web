import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const WeatherCard = ({ weatherData }) => {
    if (!weatherData) return <p>Loading...</p>;

    return (
        <Card sx={{ maxWidth: 400, margin: "20px auto", padding: 2 }}>
            <CardContent>
                <Typography variant="h5">{weatherData.name}</Typography>
                <Typography variant="h6">
                    Temperature: {weatherData.main.temp} °C
                </Typography>
                <Typography>Condition: {weatherData.weather[0].description}</Typography>
            </CardContent>
        </Card>
    );
};

export default WeatherCard;
