begin;
create function public.handle_new_user() returns trigger language plpgsql security definer
set search_path = '' as $$ begin
insert into public.profiles (id, name)
values (
        new.id,
        coalesce (
            new.raw_user_meta_data->>'name',
            split_part(new.email, '@', 1)
        )
    );
return new;
end;
$$;
-- Create the trigger
create trigger on_auth_user_created
after
insert on auth.users for each row execute function public.handle_new_user();
commit;