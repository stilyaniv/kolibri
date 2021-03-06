import { LessonResource } from 'kolibri.resources';
import router from 'kolibri.coreVue.router';
import { createTranslator } from 'kolibri.utils.i18n';
import { lessonSummaryLink } from '../../views/lessons/lessonsRouterUtils';

const translator = createTranslator('LessonRootActionTexts', {
  newLessonCreated: 'New lesson created',
});

export function refreshClassLessons(store, classId) {
  return LessonResource.fetchCollection({
    getParams: { collection: classId },
    force: true,
  })
    .then(lessons => {
      store.commit('SET_CLASS_LESSONS', lessons);
      // resolve lessons in case it's needed
      return lessons;
    })
    .catch(error => {
      return store.dispatch('handleApiError', error, { root: true });
    });
}

export function createLesson(store, { classId, payload }) {
  return new Promise((resolve, reject) => {
    return LessonResource.saveModel({
      data: {
        ...payload,
        lesson_resources: [],
        collection: classId,
      },
    })
      .then(newLesson => {
        router.push(lessonSummaryLink({ classId: classId, lessonId: newLesson.id }));
        store.dispatch(
          'createSnackbar',
          {
            text: translator.$tr('newLessonCreated'),
            autoDismiss: true,
          },
          { root: true }
        );
        resolve();
      })
      .catch(() => {
        reject();
      });
  });
}
