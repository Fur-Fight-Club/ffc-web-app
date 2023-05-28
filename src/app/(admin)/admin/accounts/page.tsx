'use client';
import { useState } from 'react';

import { useQuery } from 'react-query';

import { IconButton } from '@components/IconButton';
import { Badge, Col, Row, Table, Text, Tooltip, User } from '@nextui-org/react';
import { Eye, Pencil, Trash } from '@phosphor-icons/react';
import { getUsers } from 'src/app/api/getUsers';

export default function AccountsAdmin() {
  const [users, setUsers] = useState([]);
  const { data } = useQuery(['user'], getUsers, {
    onSuccess: (data) => {
      setUsers(data);
    },
  });

  const columns = [
    { name: 'NAME', uid: 'name' },
    { name: 'ROLE', uid: 'role' },
    { name: 'STATUS', uid: 'status' },
    { name: 'ACTIONS', uid: 'actions' },
  ];

  type UserType = {
    id: string | number;
    firstname?: string;
    lastname?: string;
    email?: string;
    role?: string;
    team?: string;
    status: 'active' | 'paused' | 'vacation';
    age?: string;
    avatar?: string;
  };

  const renderCell = (user: any, columnKey: React.Key) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case 'name':
        return (
          <User
            squared
            // src={user?.avatar}
            color="primary"
            name={user.firstname + ' ' + user.lastname}
            css={{ p: 0 }}
          >
            {user?.email}
          </User>
        );
      case 'role':
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: 'capitalize' }}>
                {cellValue}
              </Text>
            </Row>
            <Row>
              <Text b size={13} css={{ tt: 'capitalize', color: '$accents7' }}>
                {user?.team}
              </Text>
            </Row>
          </Col>
        );
      case 'status':
        return (
          <Badge color={user?.is_email_verified === true ? 'primary' : 'error'}>
            {user?.is_email_verified === true ? 'Active' : 'Inactive'}
          </Badge>
        );

      case 'actions':
        return (
          <Row justify="center" align="center">
            <Col css={{ d: 'flex' }}>
              <Tooltip content="Détails">
                <IconButton onClick={() => console.log('View user', user?.id)}>
                  <Eye size={20} color="#889096" weight="fill" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: 'flex' }}>
              <Tooltip content="Editer">
                <IconButton onClick={() => console.log('Edit user', user?.id)}>
                  <Pencil size={20} color="#889096" weight="fill" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: 'flex' }}>
              <Tooltip
                content="Supprimer"
                color="error"
                onClick={() => console.log('Delete user', user?.id)}
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

  return (
    <Table
      aria-label="Example table with custom cells"
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

      <Table.Body items={users}>
        {(item: UserType) => (
          <Table.Row>
            {(columnKey) => (
              <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
            )}
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
}