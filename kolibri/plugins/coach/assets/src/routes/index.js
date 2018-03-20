import lessonsRoutes from './lessonsRoutes';
import examRoutes from './examRoutes';
import { showClassListPage, shouldRedirectToClassRootPage } from '../state/actions/main';
import { showGroupsPage } from '../state/actions/group';
import {
  showLearnerChannelRoot,
  showLearnerChannels,
  showLearnerItemDetails,
  showLearnerItemList,
  showLearnerList,
  showRecentChannels,
  showRecentItemsForChannel,
  showRecentLearnerItemDetails,
  showTopicChannelRoot,
  showTopicChannels,
  showTopicItemList,
  showTopicLearnerItemDetails,
  showLearnerReportsForItem,
} from '../state/actions/reports';
import { PageNames } from '../constants';
import store from 'kolibri.coreVue.vuex.store';
import router from 'kolibri.coreVue.router';

export default [
  ...lessonsRoutes,
  ...examRoutes,
  {
    name: PageNames.CLASS_LIST,
    path: '/',
    handler: () => {
      return shouldRedirectToClassRootPage().then(classId => {
        if (classId) {
          return router.replace({
            name: PageNames.CLASS_ROOT,
            params: {
              classId,
            },
          });
        }
        return showClassListPage(store);
      });
    },
  },
  {
    name: PageNames.CLASS_ROOT,
    path: '/:classId/',
    redirect: '/:classId/learners/',
  },
  {
    name: PageNames.RECENT_CHANNELS,
    path: '/:classId/recent',
    handler: to => {
      showRecentChannels(store, to.params.classId);
    },
  },
  {
    name: PageNames.RECENT_ITEMS_FOR_CHANNEL,
    path: '/:classId/recent/:channelId',
    handler: to => {
      showRecentItemsForChannel(store, to.params.classId, to.params.channelId);
    },
  },
  {
    name: PageNames.RECENT_LEARNERS_FOR_ITEM,
    path: '/:classId/recent/:channelId/:contentId',
    handler: to => {
      const showRecentOnly = true;
      showLearnerReportsForItem(
        store,
        to.params.classId,
        to.params.channelId,
        to.params.contentId,
        showRecentOnly
      );
    },
  },
  {
    name: PageNames.RECENT_LEARNER_ITEM_DETAILS_ROOT,
    path: '/:classId/recent/:channelId/:contentId/:userId',
    redirect: '/:classId/recent/:channelId/:contentId/:userId/0/0',
  },
  {
    name: PageNames.RECENT_LEARNER_ITEM_DETAILS,
    path: '/:classId/recent/:channelId/:contentId/:userId/:attemptLogIndex/:interactionIndex',
    handler: to => {
      showRecentLearnerItemDetails(
        store,
        to.params.classId,
        to.params.userId,
        to.params.channelId,
        to.params.contentId,
        Number(to.params.attemptLogIndex),
        Number(to.params.interactionIndex)
      );
    },
  },
  {
    name: PageNames.TOPIC_CHANNELS,
    path: '/:classId/topics',
    handler: to => {
      showTopicChannels(store, to.params.classId);
    },
  },
  {
    name: PageNames.TOPIC_CHANNEL_ROOT,
    path: '/:classId/topics/:channelId',
    handler: to => {
      showTopicChannelRoot(store, to.params.classId, to.params.channelId);
    },
  },
  {
    name: PageNames.TOPIC_ITEM_LIST,
    path: '/:classId/topics/:channelId/topic/:topicId',
    handler: to => {
      showTopicItemList(store, to.params.classId, to.params.channelId, to.params.topicId);
    },
  },
  {
    name: PageNames.TOPIC_LEARNERS_FOR_ITEM,
    path: '/:classId/topics/:channelId/item/:contentId',
    handler: to => {
      const showRecentOnly = false;
      showLearnerReportsForItem(
        store,
        to.params.classId,
        to.params.channelId,
        to.params.contentId,
        showRecentOnly
      );
    },
  },
  {
    name: PageNames.TOPIC_LEARNER_ITEM_DETAILS_ROOT,
    path: '/:classId/topics/:channelId/item/:contentId/:userId',
    redirect: '/:classId/topics/:channelId/item/:contentId/:userId/0/0',
  },
  {
    name: PageNames.TOPIC_LEARNER_ITEM_DETAILS,
    path: '/:classId/topics/:channelId/item/:contentId/:userId/:attemptLogIndex/:interactionIndex',
    handler: to => {
      showTopicLearnerItemDetails(
        store,
        to.params.classId,
        to.params.userId,
        to.params.channelId,
        to.params.contentId,
        Number(to.params.attemptLogIndex),
        Number(to.params.interactionIndex)
      );
    },
  },
  {
    name: PageNames.LEARNER_LIST,
    path: '/:classId/learners',
    handler: to => {
      showLearnerList(store, to.params.classId);
    },
  },
  {
    name: PageNames.LEARNER_CHANNELS,
    path: '/:classId/learners/:userId',
    handler: to => {
      showLearnerChannels(store, to.params.classId, to.params.userId);
    },
  },
  {
    name: PageNames.LEARNER_CHANNEL_ROOT,
    path: '/:classId/learners/:userId/:channelId',
    handler: to => {
      showLearnerChannelRoot(store, to.params.classId, to.params.userId, to.params.channelId);
    },
  },
  {
    name: PageNames.LEARNER_ITEM_LIST,
    path: '/:classId/learners/:userId/:channelId/topic/:topicId',
    handler: to => {
      showLearnerItemList(
        store,
        to.params.classId,
        to.params.userId,
        to.params.channelId,
        to.params.topicId
      );
    },
  },
  {
    name: PageNames.LEARNER_ITEM_DETAILS_ROOT,
    path: '/:classId/learners/:userId/:channelId/item/:contentId',
    redirect: '/:classId/learners/:userId/:channelId/item/:contentId/0/0',
  },
  {
    name: PageNames.LEARNER_ITEM_DETAILS,
    path:
      '/:classId/learners/:userId/:channelId/item/:contentId/:attemptLogIndex/:interactionIndex',
    handler: to => {
      showLearnerItemDetails(
        store,
        to.params.classId,
        to.params.userId,
        to.params.channelId,
        to.params.contentId,
        Number(to.params.attemptLogIndex),
        Number(to.params.interactionIndex)
      );
    },
  },
  {
    name: PageNames.GROUPS,
    path: '/:classId/groups',
    handler: to => {
      showGroupsPage(store, to.params.classId);
    },
  },
  {
    path: '*',
    redirect: '/',
  },
];
