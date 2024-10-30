import {
  createDeleteManyMutationHook,
  createDeleteMutationHook,
  createGetQueryHook,
  createPostMutationHook,
  createPutMutationHook,
} from '@/api/helpers';
import { queryClient } from '@/api/query-client';
import { notifications } from '@mantine/notifications';

export const useFileUpload = createPostMutationHook({
  endpoint: '/upload',
  rMutationParams: {
    onSuccess: (data) => {},
    onError: (error) => {
      notifications.show({ message: error.messages[0], color: 'red' });
    },
  },
  options: {
    isMultipart: true,
  },
});

export const useGetAtoms = createGetQueryHook({
  endpoint: '/atoms',
  rQueryParams: { queryKey: ['atoms'] },
});

export const useGetDocuments = createGetQueryHook({
  endpoint: '/documents',
  rQueryParams: { queryKey: ['getDocuments'] },
});
export const useGetDocumentsManager = createGetQueryHook({
  endpoint: '/documents/my-teams',
  rQueryParams: { queryKey: ['getDocumentsMyTeam'] },
});

export const useDeleteOneQuestion = createDeleteMutationHook({
  endpoint: '/questions/:questionId',
  rMutationParams: {
    onSuccess: (data) => {
      queryClient.invalidateQueries('getQuestions');
      notifications.show({ title: 'Question Deleted', message: 'done.' });
    },
    onError: (error) => {
      notifications.show({ message: error.messages[0], color: 'red' });
    },
  },
});
export const useDeleteOneUser = createDeleteMutationHook({
  endpoint: '/users/:userId',
  rMutationParams: {
    onSuccess: (data) => {
      queryClient.invalidateQueries('getSpecificUser');
      notifications.show({ title: 'User Deleted', message: 'done.' });
    },
    onError: (error) => {
      notifications.show({ message: error.messages[0], color: 'red' });
    },
  },
});
export const useDeleteManyDocument = createDeleteManyMutationHook({
  endpoint: '/documents/bulk',
  rMutationParams: {
    onSuccess: (data) => {
      queryClient.invalidateQueries('getDocument');
      notifications.show({ title: 'Documents Deleted', message: 'done.' });
    },
    onError: (error) => {
      notifications.show({ message: error.messages[0], color: 'red' });
    },
  },
});

export const useEditDocuments = createPutMutationHook({
  endpoint: '/documents/:documentId',
  rMutationParams: {
    onSuccess: (data) => {
      queryClient.invalidateQueries('getDocument');
      notifications.show({ title: 'document Edited!', message: 'done.' });
    },
    onError: (error) => {
      notifications.show({ message: error.messages[0], color: 'red' });
    },
  },
});

export const useEditDocumentNotify = createPutMutationHook({
  endpoint: '/documents/:documentId',
  rMutationParams: {
    onSuccess: (data) => {
      queryClient.invalidateQueries('getDocument');
    },
    onError: (error) => {
      notifications.show({ message: error.messages[0], color: 'red' });
    },
  },
});

export const usePostDocument = createPostMutationHook({
  endpoint: '/documents',
  rMutationParams: {
    onSuccess: (data) => {
      queryClient.invalidateQueries('getDocument');
      notifications.show({ message: 'Document Uploaded' });
    },
    onError: (error) => {
      notifications.show({ message: error.messages[0], color: 'red' });
    },
  },
});

export const usePostDocumentManager = createPostMutationHook({
  endpoint: '/documents/team',
  rMutationParams: {
    onSuccess: (data) => {
      queryClient.invalidateQueries('getDocumentMyTeam');
      notifications.show({ message: 'Document Uploaded' });
    },
    onError: (error) => {
      notifications.show({ message: error.messages[0], color: 'red' });
    },
  },
});
