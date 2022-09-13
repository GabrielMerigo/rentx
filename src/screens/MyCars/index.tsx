import React, { useState } from "react";
import { useQuery } from "react-query";
import api from "../../services/api";
import { CarsType } from "../Home";

import * as S from "./styles";

export function MyCars() {
  const { data: cars } = useQuery<CarsType[]>('cars_users', async () => {
    const response = await api.get('/schedules_byuser?user_id=1');
    return response.data;
  });

  console.log(cars);

  return (
    <S.Container>

    </S.Container>
  )
}