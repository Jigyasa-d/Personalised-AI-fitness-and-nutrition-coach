import fs from "fs";
import path from "path";

const exercisePath = path.resolve("../dataset/exercises.json");

const exercises = JSON.parse(
    fs.readFileSync(exercisePath)
);

export const getExercises = ({
    level,
    equipment
}) => {

    let filtered = exercises;

    if (equipment.length) {

        filtered = filtered.filter(exercise =>
            equipment.includes(exercise.equipment)
        );

    }

    return filtered.slice(0,25);

};