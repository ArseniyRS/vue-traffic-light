import {PATH_GREEN, PATH_RED, PATH_YELLOW} from "@/constatnts/routes";
import {GREEN, RED, YELLOW} from "@/constatnts/colors";

export const getColorFromPath = (path)=>{
    switch(path){
        case PATH_RED:
            return RED
        case PATH_YELLOW:
            return YELLOW
        case PATH_GREEN:
            return GREEN
        default:{
            return RED
        }
    }
}