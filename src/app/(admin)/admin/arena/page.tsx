'use client';

import { IconButton } from '@components/IconButton';
import { ModalAcceptContent } from '@components/Modal/modalAcceptContent';
import {
  Button,
  Col,
  Row,
  Spacer,
  Table,
  Text,
  Tooltip,
} from '@nextui-org/react';
import { MapPin, Pencil, Trash } from '@phosphor-icons/react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { getArenas } from 'src/app/api/Arenas/getArenas';
import { ArenaBaseType } from 'src/model/arena.schema';

export default function ArenaAdmin() {
  const [arenas, setArenas] = useState<ArenaBaseType[]>([]);
  const [acceptModal, setAcceptModal] = useState(false);

  const columns = [
    { name: 'NOM', uid: 'name' },
    { name: 'ADRESSE', uid: 'address' },
    { name: 'VILLE', uid: 'city' },
    { name: 'PAYS', uid: 'actions' },
  ];

  const { data } = useQuery(['arena'], getArenas, {
    onSuccess: (data) => {
      setArenas(data);
      console.log(arenas);
    },
  });

  const renderCell = (arena: ArenaBaseType, columnKey: React.Key) => {
    const cellValue = arena[columnKey];
    switch (columnKey) {
      case 'name':
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: 'capitalize' }}>
                {cellValue}
              </Text>
            </Row>
          </Col>
        );
      case 'address':
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: 'capitalize' }}>
                {cellValue}
              </Text>
            </Row>
          </Col>
        );
      case 'city':
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: 'capitalize' }}>
                {cellValue}
              </Text>
            </Row>
          </Col>
        );

      case 'actions':
        return (
          <Row justify="center" align="center">
            <Col css={{ d: 'flex' }}>
              <Tooltip content="Voir sur la carte">
                <IconButton onClick={() => console.log(arena?.id)}>
                  <MapPin size={20} color="#889096" weight="fill" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: 'flex' }}>
              <Tooltip content="Editer">
                <IconButton onClick={() => console.log(arena?.id)}>
                  <Pencil size={20} color="#889096" weight="fill" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: 'flex' }}>
              <Tooltip
                content="Supprimer"
                color="error"
                onClick={() => console.log(arena?.id)}
              >
                <IconButton>
                  <Trash size={20} color="#889096" weight="fill" />
                </IconButton>
              </Tooltip>
            </Col>
          </Row>
        );
      default:
        return cellValue;
    }
  };

  const showAcceptModal = () => {
    setAcceptModal(true);
  };

  const closeAcceptModal = () => {
    setAcceptModal(false);
  };

  return (
    <>
      <div>
        <h2>Gestion des Arènes</h2>
      </div>

      <button onClick={showAcceptModal}>Show Modal</button>

      <Button color="primary" auto shadow>
        Ajouter une arène
      </Button>

      <Spacer y={1} />

      <Table
        aria-label="Arena table"
        css={{
          height: 'auto',
          minWidth: '100%',
        }}
        selectionMode="none"
      >
        <Table.Header columns={columns}>
          {(column) => (
            <Table.Column
              key={column.uid}
              hideHeader={column.uid === 'actions'}
              align={column.uid === 'actions' ? 'center' : 'start'}
            >
              {column.name}
            </Table.Column>
          )}
        </Table.Header>

        <Table.Body items={arenas}>
          {(item: any) => (
            <Table.Row>
              {(columnKey) => (
                <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
              )}
            </Table.Row>
          )}
        </Table.Body>
      </Table>

      <ModalAcceptContent
        visible={acceptModal}
        closeHandler={() => closeAcceptModal}
        accepted={false}
        actionName="supprimer"
        actionTarget="l'arène"
      />
    </>
  );
}
