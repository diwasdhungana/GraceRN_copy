import {
  createDeleteManyMutationHook,
  createDeleteMutationHook,
  createGetQueryHook,
  createPostMutationHook,
  createPutMutationHook,
} from '@/api/helpers';
import { queryClient } from '@/api/query-client';
import { notifications } from '@mantine/notifications';

export const useGetSubjects = createGetQueryHook({
  endpoint: '/subjects',
  rQueryParams: { queryKey: ['subjects'] },
});

export const usePostSubject = createPostMutationHook({
  endpoint: '/subjects',
  rMutationParams: {
    onSuccess: (data) => {
      queryClient.invalidateQueries('subjects');
    },
    onError: (error) => {
      notifications.show({ message: error.messages[0], color: 'red' });
    },
  },
});

export const usePutSubject = createPutMutationHook({
  endpoint: '/subjects/:id',
  rMutationParams: {
    onSuccess: (data) => {
      queryClient.invalidateQueries('subjects');
    },
    onError: (error) => {
      notifications.show({ message: error.messages[0], color: 'red' });
    },
  },
});
