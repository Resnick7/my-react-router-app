import { gql } from '@apollo/client';

// Query para obtener profesores
export const GET_TEACHERS = gql`
  query GetTeachers($isActive: Boolean) {
    teachers(isActive: $isActive) {
      id
      firstName
      lastName
      fullName
      email
      phone
      bio
      photoUrl
      specialties
      experience
      schedule {
        day
        startTime
        endTime
        location
        ageGroup
        discipline
      }
      isActive
    }
  }
`;

// Query para obtener noticias
export const GET_NEWS = gql`
  query GetNews($limit: Int, $offset: Int, $category: String, $isPublished: Boolean) {
    news(limit: $limit, offset: $offset, category: $category, isPublished: $isPublished) {
      id
      title
      content
      excerpt
      imageUrl
      category
      tags
      isPublished
      publishedAt
      views
      author {
        id
        username
      }
      createdAt
    }
  }
`;

// Query para obtener un artículo de noticias
export const GET_NEWS_ITEM = gql`
  query GetNewsItem($id: ID!) {
    newsItem(id: $id) {
      id
      title
      content
      excerpt
      imageUrl
      category
      tags
      isPublished
      publishedAt
      views
      author {
        id
        username
        email
      }
      createdAt
      updatedAt
    }
  }
`;

// Query para obtener torneos
export const GET_TOURNAMENTS = gql`
  query GetTournaments($limit: Int, $offset: Int, $status: String, $category: String) {
    tournaments(limit: $limit, offset: $offset, status: $status, category: $category) {
      id
      name
      description
      category
      location
      date
      endDate
      registrationDeadline
      registrationLink
      disciplines
      ageCategories
      status
      imageUrl
      organizer
      contactInfo {
        email
        phone
      }
      isPublished
      createdAt
    }
  }
`;

// Query para torneos próximos
export const GET_UPCOMING_TOURNAMENTS = gql`
  query GetUpcomingTournaments {
    upcomingTournaments {
      id
      name
      description
      category
      location
      date
      endDate
      registrationDeadline
      registrationLink
      disciplines
      ageCategories
      status
      imageUrl
      organizer
      contactInfo {
        email
        phone
      }
    }
  }
`;

// Query para obtener resultados de torneos
export const GET_TOURNAMENT_RESULTS = gql`
  query GetTournamentResults($tournamentId: ID, $limit: Int, $offset: Int) {
    tournamentResults(tournamentId: $tournamentId, limit: $limit, offset: $offset) {
      id
      title
      description
      pdfUrl
      pdfFileName
      fileSize
      resultType
      discipline
      category
      isPublished
      publishedAt
      downloads
      tournament {
        id
        name
        date
      }
      uploadedBy {
        id
        username
      }
      createdAt
    }
  }
`;

// Mutation para incrementar vistas de noticias
export const INCREMENT_NEWS_VIEWS = gql`
  mutation IncrementNewsViews($id: ID!) {
    incrementNewsViews(id: $id) {
      id
      views
    }
  }
`;

// Mutation para incrementar descargas de resultados
export const INCREMENT_RESULT_DOWNLOADS = gql`
  mutation IncrementResultDownloads($id: ID!) {
    incrementResultDownloads(id: $id) {
      id
      downloads
    }
  }
`;

// Mutation para crear contacto
export const CREATE_CONTACT = gql`
  mutation CreateContact($input: CreateContactInput!) {
    createContact(input: $input) {
      id
      name
      email
      phone
      subject
      message
      status
      category
      createdAt
    }
  }
`;