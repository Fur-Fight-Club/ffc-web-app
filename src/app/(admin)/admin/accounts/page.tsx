'use client';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteUser } from 'src/app/api/Users/deletUser';
import { getUsers } from 'src/app/api/Users/getUsers';

import { IconButton } from '@components/IconButton';
import { Badge, Col, Row, Table, Text, Tooltip, User } from '@nextui-org/react';
import { PawPrint, Pencil, Trash } from '@phosphor-icons/react';
import { EditUserType } from 'src/model/user.schema';
import { useLoginMutation } from 'src/store/application/slice';
import { Modals } from '../../components/Modal/modalAccounts';
import { ModalsMonster } from '../../components/Modal/modalMonster';

export default function AccountsAdmin() {
  const queryClient = useQueryClient();

  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState<EditUserType>({} as EditUserType);
  const [userIdMonster, setUserIdMonster] = useState<number>(0);

  const [visibleModalAccount, setVisibleModalAccount] = useState(false);
  const [visibleModalMonster, setVisibleModalMonster] = useState(false);

  const handleModalAccount = (userId: number) => {
    const userD = users.find((user: EditUserType) => user.id === userId);
    if (userD) {
      setUserData(userD);
      setVisibleModalAccount(true);
    } else {
      console.log('user not found');
      setVisibleModalAccount(false);
    }
  };
  const closeModalAccount = () => {
    setUserData({} as EditUserType);
    setVisibleModalAccount(false);
  };

  const handleModalMonster = (userId: number) => {
    setUserIdMonster(userId);
    setVisibleModalMonster(true);
  };

  const closeModalMonster = () => {
    setUserIdMonster(0);
    setVisibleModalMonster(false);
  };

  const { data } = useQuery(['user'], getUsers, {
    onSuccess: (data) => {
      setUsers(data);
    },
  });

  const deleteUserMutation = useMutation(deleteUser, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('user');
    },
  });

  const handleDeleteUser = (id: number) => {
    deleteUserMutation.mutate(id);
  };

  const columns = [
    { name: 'NAME', uid: 'name' },
    { name: 'ROLE', uid: 'role' },
    { name: 'STATUS', uid: 'status' },
    { name: 'ACTIONS', uid: 'actions' },
  ];

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
          <Badge color={user?.is_email_verified === true ? 'success' : 'error'}>
            {user?.is_email_verified === true ? 'Active' : 'Inactive'}
          </Badge>
        );

      case 'actions':
        return (
          <Row justify="center" align="center">
            <Col css={{ d: 'flex' }}>
              <Tooltip content="Voir les monstres">
                <IconButton onClick={() => handleModalMonster(user?.id)}>
                  <PawPrint size={20} color="#889096" weight="fill" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: 'flex' }}>
              <Tooltip content="Editer">
                <IconButton onClick={() => handleModalAccount(user?.id)}>
                  <Pencil size={20} color="#889096" weight="fill" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: 'flex' }}>
              <Tooltip
                content="Supprimer"
                color="error"
                onClick={() => handleDeleteUser(user?.id)}
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

  const [fakeLogin, { data: pouetData }] = useLoginMutation();

  useEffect(() => {
    return console.log(pouetData);
  }, [pouetData]);

  return (
    <>
      <button
        onClick={() =>
          fakeLogin({
            email: 'mcamus@condorcet93.fr',
            password: 'BOITE2caramel',
          })
        }
      >
        FAKE LOGIN
      </button>
      <Table
        aria-label="Users table"
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
          {(item: EditUserType) => (
            <Table.Row>
              {(columnKey) => (
                <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
              )}
            </Table.Row>
          )}
        </Table.Body>
      </Table>

      <Modals
        visible={visibleModalAccount}
        closeHandler={closeModalAccount}
        user={userData}
      />
      <ModalsMonster
        visible={visibleModalMonster}
        closeHandler={closeModalMonster}
        userId={userIdMonster}
      />
    </>
  );
}
