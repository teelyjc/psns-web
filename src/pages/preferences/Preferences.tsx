import {
  ChangeEvent,
  Fragment,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
  Toast,
} from "react-bootstrap";

import Navbar from "@/components/common/Navbar";
import { useCurrentUserQuery } from "@/hooks/AuthHooks";
import { usePetsQuery } from "@/hooks/PetHooks";
import { useEditUserPreferences } from "@/hooks/UserHooks";
import { Pet } from "@/types.d";

const Preferences: FunctionComponent = () => {
  const [userInfo, setUserInfo] = useState({
    firstname: "",
    lastname: "",
  });

  const [pets, setPets] = useState<Pet[]>([]);
  const [isShowing, setIsShowing] = useState(false);

  const { mutate: setUserPreferences } = useEditUserPreferences();
  const { data: userQuery } = useCurrentUserQuery();
  const { data: petsQuery } = usePetsQuery();

  useEffect(() => {
    if (userQuery) {
      setUserInfo({
        firstname: userQuery.firstname,
        lastname: userQuery.lastname,
      });
    }

    if (petsQuery) {
      setPets([...petsQuery]);
    }
  }, [userQuery, petsQuery]);

  const handleUserInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  if (!userQuery) {
    return <></>;
  }

  return (
    <Fragment>
      <Navbar />
      <Toast
        bg="success"
        className="d-inline-block m-1"
        autohide
        delay={5000}
        show={isShowing}
        onClose={() => setIsShowing(false)}
      >
        <Toast.Header>แจ้งเตือน</Toast.Header>
        <Toast.Body className="text-white">
          แก้ไขข้อมูลส่วนตัวสำเร็จ !
        </Toast.Body>
      </Toast>

      <Container className="mt-4">
        <Form
          className="border p-4 mb-3 shadow-sm"
          onSubmit={(e) => {
            e.preventDefault();
            setUserPreferences({
              id: userQuery.id,
              firstname: userInfo.firstname,
              lastname: userInfo.lastname,
            });
            setIsShowing(true);
          }}
        >
          <h1>แก้ไขข้อมูล ชื่อ-นามสกุล</h1>
          <p>ข้อมูลเบื้องต้นของคุณที่จะต้องใช้สำหรับการออกบิลใบเสร็จ</p>

          <Row className="mb-3">
            <Col>
              <FloatingLabel label="ชื่อจริง">
                <Form.Control
                  type="text"
                  name="firstname"
                  id="firstname"
                  value={userInfo.firstname}
                  onChange={handleUserInfoChange}
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel label="นามสกุล">
                <Form.Control
                  type="text"
                  name="lastname"
                  id="lastname"
                  value={userInfo.lastname}
                  onChange={handleUserInfoChange}
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Button type="submit" variant="warning" className="w-100">
            แก้ไข
          </Button>
        </Form>

        <div className="border p-4 mb-3 shadow-sm">
          <h1>สัตว์เลี้ยงของคุณ</h1>
          <p>สัตว์เลี้ยงที่คุณลงทะเบียนไว้ จะปรากฏที่นี่</p>
          <Row>
            {pets.length > 0 ? (
              pets.map((p) => {
                return (
                  <Col key={p.id}>
                    <Card bg="light">
                      <Card.Header>{p.name}</Card.Header>
                      <Card.Body>
                        <Card.Text>{p.gene}</Card.Text>
                        <Button variant="warning" className="w-100">
                          แก้ไขข้อมูล
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })
            ) : (
              <h5>ไม่พบสัตว์เลี้ยงของคุณในระบบ</h5>
            )}
          </Row>
        </div>
      </Container>
    </Fragment>
  );
};

export default Preferences;
