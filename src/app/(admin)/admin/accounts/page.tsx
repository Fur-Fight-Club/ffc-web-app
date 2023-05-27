'use client';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { GET } from 'src/app/api/route';

import { IconButton } from '@components/IconButton';
import { Badge, Col, Row, Table, Text, Tooltip, User } from '@nextui-org/react';
import { Eye, Pencil, Trash } from '@phosphor-icons/react';

export default function AccountsAdmin() {
  const [users, setUsers] = useState([]);
  const { data } = useQuery(['user'], getUsers, {
    onSuccess: (data) => {
      setUsers(data);
      console.log(data);
      console.log(data[0].is_email_verified);
    },
  });

  const columns = [
    { name: 'NAME', uid: 'name' },
    { name: 'ROLE', uid: 'role' },
    { name: 'STATUS', uid: 'status' },
    { name: 'ACTIONS', uid: 'actions' },
  ];

  async function getUsers() {
    const res = await GET('http://localhost:4000/user/');
    return res.json();
  }

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
        return <Badge color={cellValue}>{user?.is_email_verified}</Badge>;

      case 'actions':
        return (
          <Row justify="center" align="center">
            <Col css={{ d: 'flex' }}>
              <Tooltip content="Details">
                <IconButton onClick={() => console.log('View user', user?.id)}>
                  <Eye size={20} color="#889096" weight="fill" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: 'flex' }}>
              <Tooltip content="Edit user">
                <IconButton onClick={() => console.log('Edit user', user?.id)}>
                  <Pencil size={20} color="#889096" weight="fill" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: 'flex' }}>
              <Tooltip
                content="Delete user"
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
