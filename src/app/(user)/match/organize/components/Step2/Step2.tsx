"use client";

import { Button, Grid, Row, Spacer } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Arena } from "src/store/arenas/arenas.model";
import { createMatchFormState } from "src/store/matches/selector";
import {
  setArenaCreateForm,
  setMonsterCreateForm,
  setStepCreateForm,
} from "src/store/matches/slice";

type Step2Props = {};

const Step2 = (props: Step2Props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { monster, step, arena, bet } = useSelector(createMatchFormState);

  const handleOnClick = (selectedArena: Arena) => {
    arena?.id === selectedArena.id
      ? dispatch(setMonsterCreateForm(null))
      : dispatch(setArenaCreateForm(selectedArena));
  };

  const handleStepBack = () => {
    dispatch(setStepCreateForm(0));
  };

  return (
    <div style={{ height: "95%" }}>
      <Grid.Container css={{ height: "100%", position: "relative" }} gap={2}>
        <Grid xs={4}>
          <div style={{ width: "100%" }}>
            <div>Arènes disponibles</div>
          </div>
        </Grid>
        <Grid xs={4}>
          <div style={{ width: "100%" }}>
            <div>Fiche </div>
          </div>
        </Grid>
        <Grid xs={4}>
          <div style={{ width: "100%" }}>
            <div>Pouet arène </div>
          </div>
        </Grid>
      </Grid.Container>
      <Row justify="flex-end">
        <Button bordered onClick={handleStepBack}>
          Retour
        </Button>
        <Spacer x={0.5} />
        <Button
          {...(!arena && { disabled: true })}
          onClick={() => toast.success("Arène sélectioné sélectionné !")}
        >
          Suivant
        </Button>
      </Row>
    </div>
  );
};

export default Step2;
