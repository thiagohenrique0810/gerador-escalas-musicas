import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from '../store';

const Profile: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useSelector((state: RootState) => state.user);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {t('profile_login_required')}
            </h1>
            <p className="text-gray-600 mb-6">
              {t('profile_login_required_desc')}
            </p>
            <button
              className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700"
              onClick={() => {/* TODO: Implementar login */}}
            >
              {t('profile_login')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Cabeçalho do Perfil */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-3xl text-gray-500">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {user.name}
              </h1>
              <p className="text-gray-600">
                {t('profile_level')}: {user.level}
              </p>
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Tempo de Prática */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {t('profile_practice_time')}
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">
                  {t('profile_daily_practice')}
                </p>
                <p className="text-2xl font-bold text-primary-600">
                  {user.dailyPracticeTime} min
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  {t('profile_weekly_practice')}
                </p>
                <p className="text-2xl font-bold text-primary-600">
                  {user.weeklyPracticeTime} min
                </p>
              </div>
            </div>
          </div>

          {/* Conquistas */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {t('profile_achievements')}
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">
                  {t('profile_exercises_completed')}
                </p>
                <p className="text-2xl font-bold text-primary-600">
                  {user.completedExercises}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  {t('profile_average_score')}
                </p>
                <p className="text-2xl font-bold text-primary-600">
                  {user.averageScore}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Metas */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {t('profile_goals')}
          </h2>
          <div className="space-y-4">
            {user.goals.map((goal, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    {goal.title}
                  </p>
                  <p className="text-sm text-gray-600">
                    {goal.description}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">
                    {goal.progress}%
                  </p>
                  <div className="w-32 h-2 bg-gray-200 rounded-full mt-1">
                    <div
                      className="h-full bg-primary-600 rounded-full"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 