import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaNotFoundException } from '../src/exception-filters/prisma-not-found.exception';

describe('Teste users.controller.ts routes (e2e)', () => {
  let app: INestApplication;
  let createsUserTest : {
                          id: number
                          name: string
                          email: string
                          createdAt: string
                          updatedAt: string
                        }
  let newUserName = "teste"
  let newEmailName = "abc@gmail.com"
  let updatedName = "edited Name"

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters( new PrismaNotFoundException());
    await app.init();
  });

  it('Create a new user (POST)', () => {
    const result = request(app.getHttpServer())
      .post('/users')
      .send({
        name: newUserName,
        email: newEmailName
      })
      .expect(201)
      .expect((res) => {
        createsUserTest = res.body
      })
      return result;
  });
 
  it('return All Users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
  });

  it('return specific user (GET)', () => {
    return request(app.getHttpServer())
      .get(`/users/${createsUserTest.id}`)
      .expect(200)
      .expect((res)=>{
        expect(res.body).toEqual(
          expect.objectContaining(
            {
              id: createsUserTest.id,
              name: createsUserTest.name,
              email: createsUserTest.email,
              createdAt: createsUserTest.createdAt,
              updatedAt: createsUserTest.updatedAt,
            }
          )
        )
      })
  });
 
  it('Change user Name (PATCH)', () => {
    return request(app.getHttpServer())
      .patch(`/users/${createsUserTest.id}`)
      .send(
        {
          name: updatedName,
          email: createsUserTest.email
        }
      )
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(
          {
            id: createsUserTest.id,
            name: updatedName,
            email: createsUserTest.email,
            createdAt: createsUserTest.createdAt,
            updatedAt: res.body.updatedAt,
          }
        )
      })
  });
  
  it('Remove this created user test (DELETE)', () => {
    return request(app.getHttpServer())
      .delete(`/users/${createsUserTest.id}`)
      .expect(204)
  });

  afterAll(async ()=>{
    app.enableShutdownHooks();
    app.close();
  });
});
