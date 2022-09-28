
-- Generated by ORDS REST Data Services 22.2.2.r2420952
-- Schema: ADMIN  Date: Tue Sep 27 09:36:08 2022 
--

BEGIN
  ORDS.ENABLE_SCHEMA(
      p_enabled             => TRUE,
      p_schema              => 'ADMIN',
      p_url_mapping_type    => 'BASE_PATH',
      p_url_mapping_pattern => 'admin',
      p_auto_rest_auth      => FALSE);
    
  ORDS.DEFINE_MODULE(
      p_module_name    => 'CLIENT',
      p_base_path      => '/client/',
      p_items_per_page => 25,
      p_status         => 'PUBLISHED',
      p_comments       => NULL);

  ORDS.DEFINE_TEMPLATE(
      p_module_name    => 'CLIENT',
      p_pattern        => 'client',
      p_priority       => 0,
      p_etag_type      => 'HASH',
      p_etag_query     => NULL,
      p_comments       => NULL);

  ORDS.DEFINE_HANDLER(
      p_module_name    => 'CLIENT',
      p_pattern        => 'client',
      p_method         => 'GET',
      p_source_type    => 'json/collection',
      p_mimes_allowed  => NULL,
      p_comments       => NULL,
      p_source         => 
'SELECT * FROM CLIENT
ORDER BY ID ASC');

  ORDS.DEFINE_HANDLER(
      p_module_name    => 'CLIENT',
      p_pattern        => 'client',
      p_method         => 'PUT',
      p_source_type    => 'plsql/block',
      p_mimes_allowed  => NULL,
      p_comments       => NULL,
      p_source         => 
'BEGIN
    UPDATE CLIENT
        SET NAME  = :name,
            EMAIL = :email,
            AGE = :age
        WHERE ID = :id;
    :status_code := 201;
END;');

  ORDS.DEFINE_HANDLER(
      p_module_name    => 'CLIENT',
      p_pattern        => 'client',
      p_method         => 'POST',
      p_source_type    => 'plsql/block',
      p_items_per_page => 25,
      p_mimes_allowed  => NULL,
      p_comments       => NULL,
      p_source         => 
'BEGIN
    INSERT INTO CLIENT ( ID, NAME, EMAIL, AGE)
                    VALUES (:id, :name, :email, :age); 
    :status_code := 201;
END;');

  ORDS.DEFINE_HANDLER(
      p_module_name    => 'CLIENT',
      p_pattern        => 'client',
      p_method         => 'DELETE',
      p_source_type    => 'plsql/block',
      p_items_per_page => 25,
      p_mimes_allowed  => NULL,
      p_comments       => NULL,
      p_source         => 
'BEGIN
    DELETE FROM CLIENT
            WHERE ID = :id;
    :status_code := 204;
END;');

  ORDS.DEFINE_TEMPLATE(
      p_module_name    => 'CLIENT',
      p_pattern        => 'client/:id',
      p_priority       => 0,
      p_etag_type      => 'HASH',
      p_etag_query     => NULL,
      p_comments       => NULL);

  ORDS.DEFINE_HANDLER(
      p_module_name    => 'CLIENT',
      p_pattern        => 'client/:id',
      p_method         => 'GET',
      p_source_type    => 'json/collection',
      p_items_per_page => 25,
      p_mimes_allowed  => NULL,
      p_comments       => NULL,
      p_source         => 
'SELECT * FROM CLIENT
WHERE ID = :id');

    
        
COMMIT;

END;