'use client';

import React from 'react';
import { Dash } from '../_utils/interfaces';
import {
  Card,
  CardBody,
  CircularProgress,
  ScrollShadow,
} from '@nextui-org/react';

const Sections = ({ sections }: Dash) => {
  return (
    <ScrollShadow
      orientation="horizontal"
      className="flex items-center gap-2 p-5 relative"
    >
      <h1 className="absolute top-2 left-2">Seções</h1>
      {sections.map((sec) => (
        <Card key={sec.id}>
          <CardBody className="flex items-center justify-center">
            <CircularProgress
              showValueLabel
              value={sec.tarefas_concluidas}
              maxValue={sec.total_tarefas}
            />
          </CardBody>
        </Card>
      ))}
    </ScrollShadow>
  );
};

export default Sections;
