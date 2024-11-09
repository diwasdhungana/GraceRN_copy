import {
  createDeleteManyMutationHook,
  createDeleteMutationHook,
  createGetQueryHook,
  createPostMutationHook,
  createPutMutationHook,
} from '@/api/helpers';
import { queryClient } from '@/api/query-client';
import { notifications } from '@mantine/notifications';

export const useCreateTest = createPostMutationHook({
  endpoint: '/tests/new',
  rMutationParams: {
    onSuccess: (data) => {
      notifications.show({ message: 'Test created successfully', color: 'green' });
      queryClient.invalidateQueries(['tests'] as any);
    },
    onError: (error) => {
      notifications.show({ message: error.messages[0], color: 'red' });
    },
  },
});

export const useGetMyTests = createGetQueryHook({
  endpoint: '/tests/mine',
  rQueryParams: {
    queryKey: ['mytests'],
  },
});

export const usePostAnswer = createPostMutationHook({
  endpoint: 'tests/answer/:testId',
  rMutationParams: {
    onSuccess: (data) => {
      notifications.show({
        message: 'Answer Submitted',
        color: 'green',
      });
      // queryClient.invalidateQueries(['mytests'] as any);
    },
    onError: (error) => {
      notifications.show({ message: error.messages[0], color: 'red' });
    },
  },
});
