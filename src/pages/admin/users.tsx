import { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Button, Card, Container, FloatingLabel, Form } from "react-bootstrap";

import Navbar from "@/components/common/navbar-nav";
import { useUsersQuery } from "@/hooks/users-hooks";
import { User } from "@/types.d";

const Users: FunctionComponent = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState<string>("");

  const { data: usersQuery } = useUsersQuery();

  useEffect(() => {
    if (usersQuery) {
      setUsers(usersQuery);
    }
  }, [usersQuery]);

  return (
    <Fragment>
      <Navbar />

      <Container className="mt-4">
        <FloatingLabel
          className="mb-3"
          label="ค้นหาชื่อผู้ใช้งาน"
          controlId="usersFilter"
        >
          <Form.Control
            type="text"
            onChange={(e) => setFilter(e.currentTarget.value)}
            value={filter}
          />
        </FloatingLabel>

        <h1 className="mb-3">ผู้ใช้งานในระบบ</h1>

        {users ? (
          users
            .filter(
              (u) =>
                u.username.toLowerCase().includes(filter.toLowerCase()) ||
                u.firstname.toLowerCase().includes(filter.toLowerCase()) ||
                u.lastname.toLowerCase().includes(filter.toLowerCase())
            )
            .map((u) => {
              return (
                <Card key={u.id} className="mb-3">
                  <Card.Body>
                    <Card.Title>{u.username}</Card.Title>
                    <Card.Subtitle>{u.id}</Card.Subtitle>
                    <Card.Text>
                      {u.firstname} {u.lastname}
                    </Card.Text>
                    <Card.Text>
                      เป็นสมาชิกเมื่อ {new Date(u.createdAt).toLocaleString()}
                      <br />
                      แก้ไขล่าสุดเมื่อ {new Date(u.updatedAt).toLocaleString()}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Button variant="warning">แก้ไช</Button>
                  </Card.Footer>
                </Card>
              );
            })
        ) : (
          <h5>ไม่พบผู้ใช้งานในระบบ</h5>
        )}
      </Container>
    </Fragment>
  );
};

export default Users;
