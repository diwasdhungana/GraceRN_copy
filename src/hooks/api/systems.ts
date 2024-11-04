import {
  createDeleteManyMutationHook,
  createDeleteMutationHook,
  createGetQueryHook,
  createPostMutationHook,
  createPutMutationHook,
} from '@/api/helpers';
import { queryClient } from '@/api/query-client';
import { notifications } from '@mantine/notifications';

export const useGetSystems = createGetQueryHook({
  endpoint: '/systems',
  rQueryParams: { queryKey: ['systems'] },
});

export const usePostSystem = createPostMutationHook({
  endpoint: '/systems',
  rMutationParams: {
    onSuccess: (data) => {
      queryClient.invalidateQueries('systems');
    },
    onError: (error) => {
      notifications.show({ message: error.messages[0], color: 'red' });
    },
  },
});

export const usePutSystem = createPutMutationHook({
  endpoint: '/systems/:id',
  rMutationParams: {
    onSuccess: (data) => {
      queryClient.invalidateQueries('systems');
    },
    onError: (error) => {
      notifications.show({ message: error.messages[0], color: 'red' });
    },
  },
});
