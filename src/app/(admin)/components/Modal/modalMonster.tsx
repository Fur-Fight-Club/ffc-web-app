'use client';

import { Modal, Text } from '@nextui-org/react';
import { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { getHisMonster } from 'src/app/api/Users/getHisMonster';
import { MonsterCard } from '../Card/MonsterCard/monsterCard';

export const ModalsMonster = (props: {
  visible: boolean;
  closeHandler: any;
  userId: number;
}) => {
  const queryClient = useQueryClient();
  const { visible, closeHandler, userId } = props;

  const {
    isLoading,
    isError,
    data: monstersData,
  } = useQuery(['monsters', userId], () => getHisMonster(userId), {
    enabled: false,
  });

  useEffect(() => {
    if (visible) {
      queryClient.prefetchQuery(['monsters', userId], () =>
        getHisMonster(userId)
      );
    }
  }, [visible, userId, queryClient]);

  if (monstersData?.length === 0 && !isLoading) {
    return (
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Cette utilisateur n'a pas encore de monstre
          </Text>
        </Modal.Header>
      </Modal>
    );
  }

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={visible}
      onClose={closeHandler}
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          Voir les monstres de l'utilisateur
        </Text>
      </Modal.Header>

      <Modal.Body>
        {monstersData?.length > 1 &&
          monstersData.map((monster: any) => (
            <MonsterCard monster={monster} key={monster.id} />
          ))}
      </Modal.Body>
    </Modal>
  );
};
